import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { storage, db } from '../firebase/config';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { Upload, Trash2, Download } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [userFiles, setUserFiles] = useState<Array<{ name: string, url: string, id: string }>>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchUserFiles();
    }
  }, [currentUser]);

  const fetchUserFiles = async () => {
    if (!currentUser) return;

    const q = query(collection(db, 'files'), where('userId', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    const files = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setUserFiles(files as Array<{ name: string, url: string, id: string }>);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !currentUser) return;

    setUploading(true);
    const storageRef = ref(storage, `files/${currentUser.uid}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'files'), {
        name: file.name,
        url: downloadURL,
        userId: currentUser.uid,
        createdAt: new Date()
      });

      setFile(null);
      fetchUserFiles();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    if (!currentUser) return;

    try {
      // Eliminar el archivo de Storage
      const storageRef = ref(storage, `files/${currentUser.uid}/${fileName}`);
      await deleteObject(storageRef);

      // Eliminar la referencia del archivo en Firestore
      await deleteDoc(doc(db, 'files', fileId));

      // Actualizar la lista de archivos
      fetchUserFiles();
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Subir nuevo archivo</h3>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`bg-blue-600 text-white px-4 py-2 rounded flex items-center ${
              (!file || uploading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            <Upload className="mr-2" size={20} />
            {uploading ? 'Subiendo...' : 'Subir'}
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Tus archivos</h3>
        {userFiles.length === 0 ? (
          <p>No tienes archivos subidos.</p>
        ) : (
          <ul className="space-y-2">
            {userFiles.map((file) => (
              <li key={file.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
                <span>{file.name}</span>
                <div className="flex space-x-2">
                  <a
                    href={file.url}
                    download
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                    title="Descargar"
                  >
                    <Download size={20} />
                  </a>
                  <button
                    onClick={() => handleDelete(file.id, file.name)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    title="Eliminar"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;