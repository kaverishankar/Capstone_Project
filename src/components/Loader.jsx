const Loader = () => {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          display: "flex",
          placeContent: "center",
          placeItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
      </div>
    );
  };
  
  export default Loader;