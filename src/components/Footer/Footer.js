import React from 'react';
import { SiNotion } from "react-icons/si";
import { Link } from 'react-router-dom';

const componentName = () => {

    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    }

    return (
        <section id="footer" className="footer">
            <div className="container">
                <Link to="/" className="footer-title"><span>I</span>UAM</Link>
                <p className="copyright">Copyright &copy; <span className="footer-year">{thisYear()}</span> <span className="footer-wooahan">Wooahan Agile</span> All right reserved.</p>
                <div className="footer-icons">
                    <button 
                        onClick={() => window.open('https://www.notion.so/ko', '_blank')}
                        className="footer-tooltip" 
                        data-tooltips="Wooahan Agile Notion"
                    >
                        <p className="ir_su">Notion icon</p>
                        <SiNotion className="footer-icon-notion"/>
                    </button>
                    <button
                        onClick={() => window.open('https://www.induk.ac.kr/KR/index.do', '_blank')}
                        data-tooltips="Induk University" 
                        className="footer-tooltip"
                    >
                        <div className="footer-icon-idu" />
                    </button>
                </div>
                
            </div>
        </section>
    );
};

export default componentName;