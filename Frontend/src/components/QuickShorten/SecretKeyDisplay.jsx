import SecretInput from '../SecretInput.jsx';

const SecretKeyDisplay = ({ secretKey }) => (
  <div className="mt-6 p-4 border-2 border-white">
    <p className="  text-sm text-gray-300">
      Secret key (use this to add the URL to your account):
    </p>
    <SecretInput secretKey={secretKey} />
  </div>
);

export default SecretKeyDisplay;
