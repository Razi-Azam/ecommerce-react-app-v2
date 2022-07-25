import React, {Fragment, useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import Container from '../container/Container';
import chevronRight from '../../assets/images/chevron-right.svg';
import heartIcon from '../../assets/images/heart.svg';
import sliders from '../../assets/images/sliders.svg';
import arrowUp from '../../assets/images/arrow-up.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import crossIcon from '../../assets/images/x.svg';
import chevronDown from '../../assets/images/chevron-down.svg';
import CategoryBanner from '../banner/CategoryBanner';
import {loadProducts} from '../../redux/action';

export default function ProductList() {
    const [loader, setLoader] = useState(false);
    const id = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSortWindowVisible, setIsSortWindowVisible] = useState(window.innerWidth > 990 ? true : false);
    const [isFilterWindowVisible, setIsFilterWindowVisible] = useState(window.innerWidth > 990 ? true : false);
    const [checkedData, setCheckedData] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const store = useSelector(state => state.data);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        posts: [],
        postsPerPage: 12
    });

    let storeData = [...store.products];

    pagination.posts = [...store.products];

    const indexOfLastPost = pagination.currentPage * pagination.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - pagination.postsPerPage;
    let currentPosts;
    if(isFilterActive === false) {
        currentPosts = pagination.posts.slice(indexOfFirstPost, indexOfLastPost);
    }
    else {
        currentPosts = filteredResults.slice(indexOfFirstPost, indexOfLastPost);
    }

    //for page numbers
    const pageNumbers = []

    if(isFilterActive === false) {
        for (let i = 1; i <= Math.ceil(pagination.posts.length / pagination.postsPerPage); i++) {
            pageNumbers.push(i);
        }
    }
    else {
        for (let i = 1; i <= Math.ceil(filteredResults.length / pagination.postsPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    //load products from redux store
    useEffect(() => {
        dispatch(loadProducts());
    }, []);

    //toggle the visibility of the filter and sort components 
    //in different screen sizes
    useEffect(() => {
        const windowResizeHandler = () => {
            if(window.innerWidth > 990) {
                setIsSortWindowVisible(() => true);
                setIsFilterWindowVisible(() => true);
            }
            else if(window.innerWidth < 990) {
                setIsSortWindowVisible(() => false);
                setIsFilterWindowVisible(() => false); ;
            }
        };
        window.addEventListener('resize', windowResizeHandler);

        return () => {
            window.removeEventListener('resize', windowResizeHandler);
        };
    }, []);

    const selectChangeHandler = (event) => {
        let tempArr = [];

        if(event.target.value === 'lowerPrice') {
            tempArr = filteredResults.sort((val1, val2) => (val1.price > val2.price) ? 1 : -1);
            setIsFilterActive(true);
            console.log('lowerPrice ',tempArr);
        }
        if(event.target.value === 'higherPrice') {
            tempArr = filteredResults.sort((val1, val2) => (val1.price < val2.price) ? 1 : -1);
            setIsFilterActive(true);
            console.log('higherPrice ',tempArr);
        }
        if(event.target.value === 'desc') {
            tempArr = filteredResults.sort((val1, val2) => (val1.id < val2.id) ? 1 : -1);
            setIsFilterActive(true);
            console.log('desc ',tempArr);
        }
        if(event.target.value === 'asc') {
            tempArr = filteredResults.sort((val1, val2) => (val1.id > val2.id) ? 1 : -1);
            setIsFilterActive(true);
            console.log('asc ',tempArr);
        }
        if(tempArr.length === 0) {
            tempArr = [...store.products];
            setIsFilterActive(true);
        }
        setFilteredResults(() => tempArr.map(item => item));
    }

    // const paginationClickHandler = (event,id) => {
    //     event.preventDefault();

    //     if(id === 1) {
    //         setLowerRange(0);
    //         setUpperRange(12);
    //     }
    //     if(id === 2) {
    //         setLowerRange(12);
    //         setUpperRange(24);
    //     }
    // }

    //show sort Window
    const showSortWindow = () => {
        setIsSortWindowVisible(true);
        const mobileSortWindow = document.querySelector('.mobile-sort-window');
        if(isSortWindowVisible === true) {
            mobileSortWindow.style.visibility = 'visible';
        }
    }
    //hide sort Window
    const hideSortWindow = () => {
        const mobileSortWindow = document.querySelector('.mobile-sort-window');
        mobileSortWindow.style.visibility = 'hidden';
    }

    //show filter window
    const showFilterWindow = () => {
        setIsFilterWindowVisible(true);
        const filterWindow = document.querySelector('.product-list-filter');
        if(isFilterWindowVisible === true) {
            filterWindow.style.visibility = 'visible';
        }
    }

    //hide filter window
    const hideFilterWindow = () => {
        const filterWindow = document.querySelector('.product-list-filter');
        filterWindow.style.visibility = 'hidden';
    }

    let checkedVal = [...checkedData];
    //category filter handler
    const filterCategoryHandler = (event) => {
        if(event.target.checked) { 
            checkedVal.push(event.target.value);
            setIsFilterActive(true);
        } 
        else {
            var targetedValIndex = checkedVal.indexOf(event.target.value); 
            if (targetedValIndex !== -1){
                checkedVal.splice(targetedValIndex, 1);
                setIsFilterActive(true);
            }
        }

        setCheckedData(checkedVal);
        let tempArr = [];

        for(let i=0; i< storeData.length; i++) {
            for(let j=0; j< checkedVal.length; j++) {
                if(storeData[i].category === checkedVal[j]) {
                    tempArr.push(storeData[i]);
                }
            }
        }

        if(tempArr.length === 0) {
            tempArr = [...store.products];
        }
        setFilteredResults(() => tempArr.map(item => item));
    }

    //set page handler
    const setPage = (pageNum) => {
        setPagination({
            ...pagination, 
            currentPage: pageNum
        })
    }

  return (
    <Fragment>
        <CategoryBanner />
        <Container> 
            {
               store.products.length === 0 
               ? <div className='loader-text'>{store.loaderText}</div> :
            <div className='product-list-wrapper'>
                <div className='product-list-toolbar'>
                    <div className='toolbar-section1'>
                        <p>Clothing / Women’s / Outerwear</p>
                    </div>
                    <div className='toolbar-section2'>
                        <div className='result-count'>
                            <p>{!isFilterActive ? store.products.length : filteredResults.length} Results</p>
                        </div>
                        <div className='sort-section'>
                            {isSortWindowVisible &&
                            <div className='mobile-sort-window'>
                                <section className='drowp-down-combo-box'>
                                    <select name="sort" id="sort-box" onChange={selectChangeHandler}>
                                        <option value='desc'>Sort by Latest</option>
                                        <option value='asc'>Sort by Oldest</option>
                                        <option value='lowerPrice'>Sort by Lower Price</option>
                                        <option value='higherPrice'>Sort by Higher Price</option>
                                    </select>
                                    <img src={chevronDown} id='btn-select-box' alt='chevron down'/>
                                </section>
                                <button onClick={hideSortWindow}>Close</button>
                            </div>
                            }
                            <div className='mobile-filter-menu'>
                                <ul className='filter-section1' onClick={showFilterWindow}>
                                    <li>
                                        <a href='#'>
                                            <img src={sliders} alt='filter icon'/>
                                            Filter Results
                                        </a>
                                    </li>
                                </ul>
                                <ul className='filter-section2' onClick={showSortWindow}>
                                    <li>
                                        <a href='#'>
                                            <span>
                                                <img src={arrowUp} alt='arrow up'/>
                                                <img src={arrowDown} alt='arrow down'/>
                                            </span>
                                            Sort Products
                                        </a>
                                    </li>  
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='product-list-section'>
                    {isFilterWindowVisible &&
                    <div className='product-list-filter'>
                        <div className='filter-header'>
                            <h3>Filters</h3>
                            <button onClick={hideFilterWindow}>
                                <img src={crossIcon} alt='x'/>
                            </button>
                        </div>
                        <div className='filter-category'>
                            <h3>Categories</h3>
                            <ul>
                                <li>
                                    <input type="checkbox" id="women" name="women's clothing" value="women's clothing" onChange={filterCategoryHandler}/>
                                    Women's clothing
                                </li>
                                <li>
                                    <input type="checkbox" id="jewelery" name="jewelery" value="jewelery"  onChange={filterCategoryHandler}/>
                                    Jewelery
                                </li>
                                <li>
                                    <input type="checkbox" id="electronic" name="electronics" value="electronics"  onChange={filterCategoryHandler}/>
                                    Electronics
                                </li>
                                <li>
                                    <input type="checkbox" id="men" name="men's clothing" value="men's clothing" onChange={filterCategoryHandler}/>
                                    Men's clothing
                                </li>
                            </ul>
                        </div>
                        <div className='filter-style'>
                            <h3>Style</h3>
                            <ul>
                                <li>
                                    <input type="checkbox" id="Outdoor" name="Outdoor"/>
                                    Outdoor
                                </li>
                                <li>
                                    <input type="checkbox" id="Casual" name="Casual"/>
                                    Casual
                                </li>
                                <li>
                                    <input type="checkbox" id="Athleisure" name="Athleisure"/>
                                    Athleisure
                                </li>
                                <li>
                                    <input type="checkbox" id="Runnig" name="Runnig"/>
                                    Runnig
                                </li>
                                <li>
                                    <input type="checkbox" id="Active" name="Active"/>
                                    Active
                                </li>
                            </ul>
                        </div>
                        <div className='filter-color'>
                            <h3>Color</h3>
                            <div className='color-box'>
                                <div className='color-card' id='black'/>
                                <div className='color-card' id='white'/>
                                <div className='color-card' id='green'/>
                                <div className='color-card' id='yellow'/>
                                <div className='color-card' id='blue'/>
                                <div className='color-card' id='red'/>
                                <div className='color-card' id='purple'/>
                                <div className='color-card' id='pink'/>
                                <div className='color-card' id='saffron'/>
                                <div className='color-card' id='gradient'/>
                            </div>
                        </div>
                        <div className='filter-brand'>
                            <h3>Brand</h3>
                            <ul>
                                <li>
                                    <input type="checkbox" id="Outdoor" name="Outdoor"/>
                                    Outdoor
                                </li>
                                <li>
                                    <input type="checkbox" id="calvinKlein" name="calvinKlein"/>
                                    Calvin Klein
                                </li>
                                <li>
                                    <input type="checkbox" id="Dolce" name="Dolce"/>
                                    Dolce &amp; Gabbana
                                </li>
                                <li>
                                    <input type="checkbox" id="MIu" name="Miu"/>
                                    Miu Miu
                                </li>
                                <li>
                                    <input type="checkbox" id="Prada" name="Prada"/>
                                    Prada
                                </li>
                                <li>
                                    <input type="checkbox" id="Rag" name="Rag"/>
                                    Rag &amp; Bone
                                </li>
                                <li>
                                    <input type="checkbox" id="Gucci" name="Gucci"/>
                                    Gucci
                                </li>
                                <li>
                                    <input type="checkbox" id="Chanel" name="Chanel"/>
                                    Chanel
                                </li>
                            </ul>
                        </div>
                    </div>
                    }
                    <div className='product-list-display'>
                        <div className='product-list-box'>
                            {
                                currentPosts.map((product, index) => 
                                <div className='product-card' key={index}>
                                    <div className='product-image' 
                                        title='Click to view product details'
                                        onClick={() => navigate(`/product-details/${product.id}`)}
                                    >
                                        <img src={product.image} alt='product picture'/>
                                    </div>
                                    <ul className='product-info'>
                                        <li>{product.title !== undefined && product.title.split(' ').slice(0,3).join(' ')}</li>
                                        <li>${product.price}</li>
                                        <li>
                                            <a href='#'>
                                                <img src={heartIcon} alt='heart icon'/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                )
                            }
                        </div>
                        <div className='pagination-section'>
                            <ul>
                                {
                                     pageNumbers.map((pageNum, index) => {
                                        if(pagination.currentPage > 1 && currentPosts.length === 0) {
                                            setPage(pageNum);
                                            return (
                                                <li>
                                                    <a  
                                                        key={index}
                                                        className={pageNum === pagination.currentPage ? `active` : ' '}
                                                        href='#' 
                                                        onClick={() => {setPage(pageNum)}}>
                                                        {pageNum}
                                                    </a>         
                                                </li>
                                                )
                                        } 
                                        else {
                                        return (
                                        <li>
                                            <a  
                                                key={index}
                                                className={pageNum === pagination.currentPage ? `active` : ' '}
                                                href='#' 
                                                onClick={() => {setPage(pageNum)}}>
                                                {pageNum}
                                            </a>         
                                        </li>
                                        )}
                                        })
                                }
                            </ul>
                            {pageNumbers.length >= 2 ?
                            <a href='#'>
                                <img src={chevronRight} id='chevronRight' alt='chevron right icon'/>
                            </a>
                            : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            }
        </Container>
    </Fragment>
  )
}
