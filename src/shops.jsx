import react,{useState} from 'react';
import { Link } from 'react-router-dom';


export default function Shops(){
    return (
        <div>
            <h1>Shops</h1>
        <div style={{ display: 'flex', gap: '20px', marginTop: '3rem', justifyContent: 'center' }}>
            
            <div className='shopcard'>
             <Link to="/juicespot"  style={{ textDecoration: 'none', color: 'inherit' }}><h3>🍹JuiceSpot</h3></Link>
            </div>
            <div  className='shopcard'>
                <a><h3>🧆Chatt Shop</h3></a>
            </div>
            <div  className='shopcard'>
                <a><h3>🍨IceCream Shop</h3></a>
            </div>
            <div  className='shopcard'>
                <a><h3>🥪Breakfast Box</h3></a>
            </div>
            <div  className='shopcard' >
                <a><h3>🥘Midday Meals</h3></a>
            </div>
        </div>
        </div>
    );
}