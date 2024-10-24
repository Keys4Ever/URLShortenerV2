import './output.css'

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

          <footer className="bg-[#1f2d4099] text-white border-[1px] border-solid border-x-transparent border-b-transparent border-t-[#f8ee33] mt-4 w-full">
            <div className="flex items-center justify-center w-full m-auto p-3">
              <span>Hecho con ❤️ por Keys4Ever</span>
              <div className="flex flex-row flex-nowrap gap-2 items-center ml-auto">
                <a href="https://github.com/Keys4Ever/URLShortener" aria-label="Revisa mi github">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.418 2.865 8.165 6.84 9.486.5.092.686-.216.686-.482 0-.238-.008-.872-.013-1.71-2.785.606-3.373-1.343-3.373-1.343-.454-1.152-1.109-1.458-1.109-1.458-.905-.619.069-.608.069-.608 1.003.070 1.529 1.032 1.529 1.032.892 1.527 2.338 1.085 2.91.832.089-.647.349-1.085.635-1.334-2.221-.254-4.556-1.11-4.556-4.94 0-1.091.39-1.985 1.029-2.684-.103-.254-.447-1.272.098-2.654 0 0 .844-.271 2.761 1.029a9.613 9.613 0 0 1 2.515-.338c.854.004 1.709.114 2.515.338 1.915-1.3 2.761-1.029 2.761-1.029.546 1.382.202 2.4.098 2.654.639.699 1.029 1.593 1.029 2.684 0 3.838-2.34 4.684-4.572 4.934.358.305.677.897.677 1.805 0 1.302-.014 2.351-.014 2.666 0 .268.183.575.692.478C19.138 20.16 22 16.418 22 12c0-5.52-4.48-10-10-10z" fill="#ffffff" />
                  </svg>
                </a>
                <a href="https://wa.me/5491137018186" aria-label="Contactame a través de Whatsapp">
                  <svg width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                  </svg>
                </a>
              </div>
            </div>
          </footer>

          <script src="/public/index.js" type="module" defer></script>
        </div>
      </div>
      </>
      )
}

      export default App
