import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button>
        <Link to="/Dashboard">Iniciar sesión</Link>
      </button>
    </div>
  );
}

export default Home;
