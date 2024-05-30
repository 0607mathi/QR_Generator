import { createElement, useState } from 'react'
import '../App.css'
export const QrGenerator = () => {
  let Link
    const [img,setImage]=useState()
    const [loading,setLoading]=useState(false)
    const [qrData,setQrData]=useState("")
    const [size,setSize]=useState("")
    async function generateQR(){
         
         setLoading(true)
         try{
          if(size>=150 &&size<=300){
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`
            Link=url
            if(qrData=="") alert("please enter Data and size")
            else setImage(url)

          }
          else alert("enter valid size")

         }
         catch (error) {
           console.log("Error Occured while api transfer /n",error)
         }
         finally{
            setLoading(false)
         }
    }

    function downloadQR(){

      const link = document.createElement('a');
      link.href = Link;
      link.download = `QRcode.png`; 
      link.click();
    }

  return (
    <div className='qr-box'>

        {/* heading */}
        <h2>QR Generator</h2>

        {/* loading */}
        {loading && <p>please wait...</p>}

        {/* images */}
        {img && <img src={img} />}

        {/* data input box */}
        <label htmlFor="dataInput">Data for QR Code:</label>
        <input type="text" value={qrData} name="dataInput" id="dataInput" placeholder='Enter your Data' onChange={(e)=>{setQrData(e.target.value)}}/>
        
        {/* size input box */}
        <label htmlFor="sizeInput">Image Size (e.g., 150 upto 300)</label>
        <input type="text" value={size} name="sizeInput" id="sizeInput" placeholder='Enter Customize Size' onChange={(e)=>{setSize(e.target.value)}}/>
        
        {/* generate and download button */}
        <div className='btns'>
            <button className='generate-qr' disabled={loading} onClick={generateQR}>Genrate QR Code</button>
            <button className='download-qr' onClick={downloadQR}>Download QR Code</button>
        </div>

        {/* footer section */}
        <footer>
            Designed By <a href="https://mathiyarasu.netlify.app/">Mathiyarasu</a>
        </footer>

    </div>
  )
}
