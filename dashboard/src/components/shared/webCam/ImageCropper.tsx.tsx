import React, { useRef, useState, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { Button } from "@/components/ui";

interface ImageCropperProps {
    src: string;
    onCropComplete?: (croppedImage: string,form:any) => void;
    cropperOptions?: Cropper.Options;
    form:any
}

const ImageCropper: React.FC<ImageCropperProps> = ({ src, onCropComplete ,cropperOptions,form }) => {
    const [croppedImage, setCroppedImage] = useState<string>("");
    const imageElement = useRef<HTMLImageElement>(null);
    const cropperInstance = useRef<Cropper | null>(null);

    useEffect(() => {
        if (imageElement.current) {
            const cropper = new Cropper(imageElement.current, {
                zoomable: true,
                scalable: true,
                aspectRatio: 1,
                ...cropperOptions,
                crop() {
                    const canvas = cropper.getCroppedCanvas();
                    if (canvas) {
                        const croppedImageUrl = canvas.toDataURL("image/png");
                        setCroppedImage(croppedImageUrl);
                    }
                }
            });
            cropperInstance.current = cropper;
            return () => {
                cropper.destroy();
            };
        }
    }, [src]);

    const handleSubmit = () => {
        if (cropperInstance.current && croppedImage && onCropComplete) {
           
            onCropComplete(croppedImage,form);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center sm:flex-row flex-col sm:gap-20 gap-4">
                <div className="sm:w-1/2 w-full">
                    <img ref={imageElement} src={src} alt="Source" crossOrigin="anonymous" />
                </div>
                {croppedImage && 
                    <>
                        <img src={croppedImage} className="w-[200px] h-[200px] " alt="Cropped" />
                        <div className="mt-4 text-end">
                            <Button  type={"button"} onClick={handleSubmit}>Submit Profile Pic</Button>
                        </div>
                    </>
                }
            </div> 
        </>
    );
}

export default ImageCropper;
