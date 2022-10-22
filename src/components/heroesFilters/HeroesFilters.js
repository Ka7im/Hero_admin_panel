import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import {
    activeFilterSelected,
    filtersFetched,
    filtersFetchingError,
    filtersFetching,
} from '../../actions';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const { request } = useHttp();
    const { activeFilter, filters, filtersLoadingStatus } = useSelector(
        ({ filters }) => {
            return {
                ...filters,
            };
        },
        shallowEqual
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then((filters) => dispatch(filtersFetched(filters)))
            .catch(() => dispatch(filtersFetchingError()));
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
                        onClick={() => dispatch(activeFilterSelected(name))}
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
