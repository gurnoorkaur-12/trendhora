import './Description.css';

const Description = (props) => {
    return ( 
        <div className="product__description__product">
            <div className="description__header__container">
                <div className="description__header__line"></div>
                <div className="description__header">DETAILS</div>
            </div>
            <div className="description__detail__container">
                <div className="description__detail">
                <p>{props.item.details}</p>
                </div>
            </div>
            <div className="description__specifics__container">
                <div className="description__specifics">
                <div className="description__header__line"></div>
                <div className="description__highlights__header">Highlights</div>
                    <ul className='list-group list-group-flush'>
                        {props.item.highlights.map((highlight) =>
                             <li className='list-group-item'>- {highlight}</li>)}
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default Description;