function App() {

  return (
    <>
      <div className="bg-[#0E1015] text-[#fdfdc2] flex flex-col min-h-screen">
        <div id="overlay" className="fixed inset-0 bg-[#1f2d4099] bg-opacity-50 backdrop-blur-sm z-40 hidden"></div>

        <div className="flex-grow flex flex-col justify-center items-center space-y-8">
          <div className="z-10 grid w-full max-w-lg gap-4 border mt-7 p-6 shadow-lg duration-200 border-[#1f2d40] bg-[#1f2d4099] sm:rounded-lg">
            <div className="flex flex-col items-center space-y-1.5 mb-2">
              <h2 className="text-3xl font-semibold leading-none text-[#f8ee33] tracking-tight text-center">🚀KeysURL</h2>
            </div>

            <form method="post" action="/shortUrl" className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed opacity-80" htmlFor="originalUrl">Ingresar URL a acortar:</label>
                  <input className="flex h-9 w-full rounded-md bg-[#1f2d40b9] px-3 py-1 text-sm shadow-sm placeholder:text-[#fdfdc29f] focus-visible:outline-none focus-visible:ring-1" type="text" id="originalUrl" placeholder="https://ejemplo.com/unaurlrealmentedemasiadolarga" name="originalUrl" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed opacity-80" htmlFor="wantedUrl">Ingresar URL deseada:</label>
                  <div className="relative flex items-center">
                    <input className="flex h-9 w-full rounded-md bg-[#1f2d40b9] px-3 py-1 text-sm shadow-sm placeholder:text-[#fdfdc29f] focus-visible:outline-none focus-visible:ring-1" type="text" id="wantedUrl" name="wantedUrl" placeholder="Dejar en blanco para aleatorio." />
                    <button type="button" className="inline-flex items-center space-x-3 justify-center whitespace-nowrap text-sm font-medium text-[#f8ee33] focus-visible:outline-none bg-[#1f2d40] shadow hover:scale-105 transition-all h-9 px-4 py-2 absolute right-0 rounded-none rounded-br-md rounded-tr-md" id="randomize">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shuffle">
                        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"></path>
                        <path d="m18 2 4 4-4 4"></path>
                        <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"></path>
                        <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"></path>
                        <path d="m18 14 4 4-4 4"></path>
                      </svg>
                      <span>Randomize</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex sm:space-x-2">
                <button className="inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium text-[#f8ee33] focus-visible:outline-none bg-[#1f2d40] shadow hover:scale-105 transition-all h-9 px-4 py-2" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f8ee33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                  <span>Acortar URL</span>
                </button>
              </div>
            </form>
          </div>

          <div className="relative w-full max-w-lg gap-4 border p-6 shadow-lg border-[#1f2d40] bg-[#1f2d4099] sm:rounded-lg">
            <div className="flex flex-col space-y-2 text-center sm:text-left mb-2">
              <h2 className="text-base font-semibold leading-none text-wrap text-[#f8ee33] tracking-tight mb-4">¿Quieres ver a donde redirige una url acortada por nosotros?</h2>
              <div className="space-y-4">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed opacity-80" htmlFor="wantedUrl">Ingresar URL a previsualizar:</label>
                <input type="text" id="shortenedUrl" placeholder="Ingresar los ultimos caractares del link (ID)" className="flex h-9 w-full rounded-md bg-[#1f2d40b9] px-3 text-sm shadow-sm placeholder:text-[#fdfdc29f] focus-visible:outline-none focus-visible:ring-1" />
                <button id="fetchUrl" className="inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium text-[#f8ee33] focus-visible:outline-none bg-[#1f2d40] shadow hover:scale-105 transition-all h-9 px-4 py-2">
                  Ver original
                </button>
              </div>
            </div>
          </div>

          <div id="popup" style={{display: 'none'}} className="absolute z-50 max-w-lg w-full border p-6 shadow-lg border-[#1f2d40] bg-[#1f2d40fd]">
            <button id="closePopup" className="absolute top-2 right-2 text-[#f8ee33]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                <path d="M18 6 6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
            <div id="popupContent"></div>
          </div>
        </div>
      </div>
      </>
      )
}

      export default App
