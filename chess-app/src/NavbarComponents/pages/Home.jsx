import React from "react";
import "./CssForThePages/Home.css"
export const Home = () => {

  

     return (
        <div className="jc"> 
            <div className="jc1">
                <form className='jic' action=''>
                    <div className='mbt'>
                        <label  htmlFor="email">Email   </label>
                        <input className='mbtc' id='mbtc1' type="email" placeholder ="Enter Email"  />
                    </div>
                    <div className='mbt'>
                        <label  htmlFor="password">Password   </label>
                        <input className='mbtc' type="password" placeholder ="Enter Password" />
                    </div>
                    <button className='success'>Login</button>
                </form>
            </div>
        </div>
    )
}

