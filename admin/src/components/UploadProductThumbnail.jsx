import { IoMdClose } from "react-icons/io";

const UploadProductThumbnail = ({
  onChange,
  thumbnail,
  onDelete,
  uploading,
}) => {
  return (
    <div>
      <h1 className="font-semibold">Ảnh thumbnail</h1>
      {uploading ? (
        <div className="w-full h-[500px] flex mt-2 rounded-sm items-center justify-center bg-gray-300 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-20 w-20 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
      ) : (
        <input
          type="file"
          id="thumbnail-upload"
          className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          accept="image/*"
          onChange={onChange}
        />
      )}

      <div className="rounded-xl mt-5 border border-gray-400 bg-gray-50">
        {!uploading && thumbnail && (
          <div className="w-full h-[500px] mx-auto p-10 relative">
            <img
              src={thumbnail}
              alt={thumbnail}
              className="w-full h-full object-contain"
            />

            <span
              onClick={onDelete}
              className="flex absolute top-3 right-3 items-center justify-center w-[40px] h-[40px] bg-red-500 text-white rounded-full cursor-pointer"
            >
              <IoMdClose size={22} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProductThumbnail;
