/** @format */

import React, { useState, useRef, ChangeEvent } from "react";
import { Upload, Check, AlertCircle, FileText, Download } from "lucide-react";

type CSVUploadComponentProps = {
  apiEndpoint?: string;
};

const CSVUploadComponent: React.FC<CSVUploadComponentProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setDownloadUrl(null);

    if (!selectedFile) {
      setFile(null);
      setColumns([]);
      return;
    }

    if (
      selectedFile.type !== "text/csv" &&
      !selectedFile.name.endsWith(".csv")
    ) {
      setFileError("Only CSV files are accepted");
      setFile(null);
      setColumns([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFileError(null);
    setFile(selectedFile);

    // Parse CSV to extract column names
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      const firstLine = content.split("\n")[0];
      const extractedColumns = firstLine.split(",").map((col) => col.trim());
      setColumns(extractedColumns);
      setSelectedColumn("");
    };
    reader.readAsText(selectedFile);
  };

  const handleColumnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(e.target.value);
  };

  const handleProcess = async (): Promise<void> => {
    if (!file || !selectedColumn) return;

    setIsProcessing(true);

    // Create form data for API request
    const formData = new FormData();
    formData.append("file", file);
    formData.append("column", selectedColumn);

    try {
      const apiEndpoint = import.meta.env.VITE_API_URL as string;
      const uploadEndpoint = `${apiEndpoint}/upload`;
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process CSV");
      }

      const data = await response.json();
      const downloadUrl = `${apiEndpoint}${data.download_url}`;
      setDownloadUrl(downloadUrl);
    } catch (error) {
      setFileError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = (): void => {
    setFile(null);
    setFileError(null);
    setColumns([]);
    setSelectedColumn("");
    setDownloadUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        CSV File Processor
      </h2>

      <div className="mb-6">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${fileError ? "border-red-300 bg-red-50" : file ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50"}`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".csv"
            id="csv-upload"
          />

          {!file ? (
            <div>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <label
                htmlFor="csv-upload"
                className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Select CSV File
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Only CSV files are accepted
              </p>
            </div>
          ) : (
            <div>
              <Check className="mx-auto h-12 w-12 text-green-500" />
              <p className="mt-2 text-sm font-medium text-gray-900">
                {file.name}
              </p>
              <button
                onClick={resetForm}
                className="mt-2 inline-flex items-center px-3 py-1 text-xs text-blue-600 hover:text-blue-800"
              >
                Change file
              </button>
            </div>
          )}

          {fileError && (
            <div className="mt-2 flex items-center justify-center text-red-500">
              <AlertCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">{fileError}</span>
            </div>
          )}
        </div>
      </div>

      {columns.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Column for Processing
          </label>
          <select
            value={selectedColumn}
            onChange={handleColumnSelect}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select a column --</option>
            {columns.map((column, index) => (
              <option key={index} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={handleProcess}
          disabled={!file || !selectedColumn || isProcessing}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${!file || !selectedColumn || isProcessing ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Process File
            </>
          )}
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={`processed-${file ? file.name : "data.csv"}`}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Results
          </a>
        )}
      </div>
    </div>
  );
};

export default CSVUploadComponent;
