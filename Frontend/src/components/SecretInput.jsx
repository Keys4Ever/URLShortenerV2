import React, { useState } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { Eye, EyeClosed } from 'lucide-react';

const SecretInput = ({ secretKey }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, copyToClipboard] = useCopyToClipboard();

  const handleToggleVisibility = () => setIsVisible(!isVisible);
  const handleCopy = () => copyToClipboard(secretKey);

  return (
    <div className="flex items-center border-2 border-white p-2 bg-transparent">
      <input
        type={isVisible ? 'text' : 'password'}
        value={secretKey}
        readOnly
        className="flex-1 p-2 bg-transparent text-white focus:outline-none"
      />
      <button
        onClick={handleToggleVisibility}
        className="mx-2 text-white border-white border px-2 py-[0.125rem] hover:text-gray-300 transition"
        aria-label={isVisible ? 'Hide secret key' : 'Show secret key'}
      >
        {isVisible ? <Eye /> : <EyeClosed/>}
      </button>
      <button
        onClick={handleCopy}
        className={`px-3 py-1 bg-white text-black font-bold hover:bg-gray-200 transition`}
        aria-label="Copy secret key"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default SecretInput;
