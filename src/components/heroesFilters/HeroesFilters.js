import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { filtersChanged, fetchFilters, selectAll } from './filtersSlice';
import Spinner from '../spinner/Spinner';
import store from '../../store';

const HeroesFilters = () => {
    const { filtersLoadingStatus, activeFilter } = useSelector(
        (state) => state.filters
    );
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
    }
    const renderFilters =
        filters.length === 0 ? (
            <h5 className='text-center mt-5'>Фильтры не найдены</h5>
        ) : (
            filters.map(({ name, label, className }) => {
                const btnClass = classNames('btn', className, {
                    active: name === activeFilter,
                });

                return (
                    <button
                        className={btnClass}
                        onClick={() => dispatch(filtersChanged(name))}
                        key={name}
                    >
                        {label}
                    </button>
                );
            })
        );
    console.log('heroesfilters render');

    return (
        <div className='card shadow-lg mt-4'>
            <div className='card-body'>
                <p className='card-text'>Отфильтруйте героев по элементам</p>
                <div className='btn-group text-center'>{renderFilters}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
