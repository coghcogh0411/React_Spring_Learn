import { FaTrash } from "react-icons/fa";

const DataCategory = ({ title, data, onItemClick, onDelete }) => (
  <div className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition-all">
    <h2 className="text-xl font-bold text-blue-700 border-b pb-2 mb-4">{title}</h2>
    <div className="space-y-3">
      {data && data.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-gray-800"
        >
          <span
            className="flex-1 cursor-pointer"
            onDoubleClick={() => onItemClick(item.data_File)}
          >
            {item.data_Title}
          </span>
          <button
            onClick={() => onDelete(item.data_File)}
            className="ml-4 text-red-500 hover:text-red-700"
            title="삭제"
          >
            <FaTrash size={16} />
          </button>
        </div>
      ))}
    </div>
  </div>
);


export default DataCategory;
