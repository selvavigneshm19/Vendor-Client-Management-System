import {
    Download,
    FileText,
    Printer,
} from "lucide-react";

const ExportButtons = ({
    onExportPDF,
    onExportExcel,
    onPrint,
}) => {
    return (

        <div className="flex flex-wrap gap-4">

            {/* Export PDF */}

            <button
                onClick={onExportPDF}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition"
            >
                <FileText size={18} />
                Export PDF
            </button>

            {/* Export Excel */}

            <button
                onClick={onExportExcel}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
                <Download size={18} />
                Export Excel
            </button>

            {/* Print */}

            <button
                onClick={onPrint}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition"
            >
                <Printer size={18} />
                Print
            </button>

        </div>
    );
};

export default ExportButtons;