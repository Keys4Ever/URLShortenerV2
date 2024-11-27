import { useState } from 'react';
import { Plus } from "lucide-react";
import { addSecretToUser } from '../../services/quickShortServices';

const AddSecret = ({ userId, updateUrlsLocally, setShowAddSecret }) => {
    const [secret, setSecret] = useState('');
    const [res, setRes] = useState({
        error: false,
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!secret.trim()) {
            setRes({
                error: true,
                message: 'Please enter a secret'
            });
            return;
        }

        try {
            // Enviar al backend
            const response = await addSecretToUser(userId, secret);

            if (response.error) {
                throw new Error(response.error);
            }

            const newUrl = {
                id: response.newUrl.id,
                shortUrl: response.newUrl.shortUrl,
                longUrl: response.newUrl.longUrl,
                description: '',
                tags:[]
            }
            // Actualizar localmente las URLs
            updateUrlsLocally(newUrl);

            setSecret('');
            setRes({
                error: false,
                message: 'Secret added successfully'
            });

            // Cerrar el modal después de agregar
            setShowAddSecret(false);
        } catch (err) {
            setRes({
                error: true,
                message: err.message || 'Failed to add secret URL'
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form 
                onSubmit={handleSubmit}
                className="bg-black border-2 border-white w-full max-w-md"
            >
                <div className="p-6">
                    <input
                        type="text"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder="Enter secret URL"
                        className="w-full px-3 py-2 bg-transparent border-2 border-white focus:outline-none"
                    /> 
                    {res.message && (
                        <p className={`mt-2 ${res.error ? 'text-red-400' : 'text-green-400'}`}>{res.message}</p>
                    )}
                </div>
                <div className="flex border-t-2 border-white">
                    <button
                        type="button"
                        className="w-1/2 py-2 border-r-2 border-white hover:bg-white hover:text-black transition"
                        onClick={() => setShowAddSecret(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 py-2 bg-white text-black hover:bg-gray-200 transition flex justify-center items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Secret
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSecret;
