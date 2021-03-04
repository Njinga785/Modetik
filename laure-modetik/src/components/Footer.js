import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { AiFillLinkedin } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { FaLevelUpAlt } from "react-icons/fa";



export class Footer extends Component { 

    
    render() {
        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row bas">
                        <div className="col">
                            <h6>MODETIK</h6>
                            <p>Achetez de maniére éthique<br /> de la mode valorisant le <br />savoir faire artisanal africain</p>
                        </div>
                        <div className="col">
                            <h6>CONTACT</h6>
                            <p>Modetik<br />80 Avenue Marcel Gerard<br />75017<br />0606060606<br />contact@modetik.org</p>
                        </div>
                        <div className="col">
                            <h6>SUIVEZ-NOUS</h6>
                            <ul>
                                <li><a href="https://www.linkedin.com/in/laure-adrienne-njinga"><AiFillLinkedin color='black' size='2rem' /></a> </li>
                                <li><a href="/"><AiFillFacebook color='black' size='2rem' /></a> </li>
                                <li><a href="/"><AiFillInstagram color='black' size='2rem' /></a> </li>
                            </ul>
                        </div>

                        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FaLevelUpAlt color='black' size='2rem' /></div>
                    </div>
                    <div className="row footer-bottom">
                        <p className="col-sm">Copyright &copy; Laure Njinga {new Date().getFullYear()}</p>
                    </div> 
                  
                     
                </div>
               
            </div>
            
        )
    }
}

export default withRouter (Footer)
