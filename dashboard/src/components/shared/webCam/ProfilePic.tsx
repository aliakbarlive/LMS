import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui';

const videoConstraints: MediaTrackConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
};

interface ProfileProps {
  onCapture: (imageData: string) => void;
}

const ProfilePic: React.FC<ProfileProps> = ({ onCapture }) => {
  const [picture, setPicture] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current?.getScreenshot();
    if (pictureSrc) {
      setPicture(pictureSrc);
      onCapture(pictureSrc); // Call the callback function with the captured image data
    }
  }, [onCapture]);

  const retakePhoto = () => {
    setPicture(null);
  };

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermission(true);
      } catch (error) {
        console.error('Camera permission denied:', error);
        setError('Camera permission denied. Please check your browser settings.');
      }
    };
    getCameraPermission();
  }, []);

  return (
    <div>
      {error && <p className="text-center text-danger">{error}</p>}
      {cameraPermission && (
        <div className='flex gap-2 py-10 justify-center flex-col items-center'>
          {picture === null ? (
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              width={400}
              screenshotFormat="image/webp"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={picture} alt="Captured" />
          )}
          <div>
            {picture !== null ? (
              <Button type={"button"}  variant="solid" onClick={retakePhoto}>
                Retake
              </Button>
            ) : (
              <Button type={"button"} variant='solid' onClick={capture} >
                Capture
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePic;
