import { ArrowTopRightOnSquareIcon,PrinterIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

export default function ModalElement({ source, alt, link, setModalOpen, print }) {
    const imgRef = useRef(null)
    const handleThumbnailClick = () => {
        setModalOpen(prev => (!prev));
    }

    return (
        (
            <div className="fixed inset-0 bg-black/85  flex justify-center items-center z-50" onClick={handleThumbnailClick}>
                 {print && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation(); 
                            window.print();
                        }}
                        className="absolute button-primary border-none top-4 right-4 text-white hover:text-gray-900 p-2"
                        title="Print"
                    >
                        <PrinterIcon className="h-6 w-6" />
                    </button>
                )}
                <div className="relative bg-white p-4 rounded">
                {/* Print Button - Top Left */}
                    {/* Image inside Modal */}
                    <img
                        ref={imgRef}
                        src={source}
                        alt={alt}
                        className="w-96 h-auto rounded"
                    />

                    {/* External Link Icon */}
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-4 text-2xl text-blue-500 h-16 w-16"
                        >
                            <ArrowTopRightOnSquareIcon />
                        </a>)}
                </div>
            </div>
        )
    )
}