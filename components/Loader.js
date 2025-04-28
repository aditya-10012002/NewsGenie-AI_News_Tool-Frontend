// components/Loader.js
export default function Loader() {
    return (
      <div className="d-flex justify-content-center my-5 loader">
        <div className=" text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }  