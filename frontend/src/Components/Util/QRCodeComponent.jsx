import { QRCodeCanvas } from 'qrcode.react';
import ModalElement from './ModalElement';
import { useRef, useState } from 'react';


export default function QRCodeComponent() {
  const [modalOpen,setModalOpen] = useState(false);
  const qrRef = useRef(null);

  const getQRDataUrl = () => {
    if (qrRef.current) {
      return qrRef.current.toDataURL();
    }
    return '';
  };
    return (
      <div className="mt-6">
      <p id="share" className="pointer-events-none"> Scan QR to access:</p>
      <QRCodeCanvas ref={qrRef} onClick={()=>setModalOpen(true)} value="https://grigor-stoyanov.github.io/karaoke-app/" />
      {modalOpen && <ModalElement source={getQRDataUrl()} print={true} link={''} alt={''} setModalOpen={setModalOpen}/>}
    </div>
    )
} 

