/** @format */

import CSVUploadComponent from "./components/CSVUploadComponent.tsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Hindi to English Transliteration</h1>
          <p className="mt-2 text-sm text-gray-600">Convert Hindi names to English romanized text</p>
        </header>
        
        <main className="bg-white shadow rounded-lg p-6">
          <div className="mb-6 text-sm text-gray-600 border-l-4 border-blue-500 pl-3 py-2 bg-blue-50">
            <p>Examples:</p>
            <ul className="mt-1 space-y-1">
              <li><span className="font-medium">अमिताभ बच्चन</span> → Amitabh Bachchan</li>
              <li><span className="font-medium">शाहरुख़ ख़ान</span> → ShahRukh Khan</li>
            </ul>
          </div>
          <CSVUploadComponent />
        </main>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Upload a CSV file with Hindi names to generate English transliterations.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;