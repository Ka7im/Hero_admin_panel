import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook';
import { heroAdded } from '../../actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');
    const { request } = useHttp();
    const dispatch = useDispatch();
    const { filters, filtersLoadingStatus } = useSelector(
        ({ filters: { filters, filtersLoadingStatus } }) => ({
            filters,
            filtersLoadingStatus,
        }),
        shallowEqual
    );

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const hero = {
            id: uuidv4(),
            name,
            description,
            element,
        };

        request(
            'http://localhost:3001/heroes',
            'POST',
            JSON.stringify(hero)
        ).then(dispatch(heroAdded(hero)));

        setName('');
        setDescription('');
        setElement('');
    };

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Загрузка элементов</option>;
        } else if (status === 'error') {
            return <option>Ошибка загрузки</option>;
        }

        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                // eslint-disable-next-line
                if (name === 'all') return;

                return (
                    <option key={name} value={name}>
                        {label}
                    </option>
                );
            });
        }
    };
    console.log('heroesaddform render');

    return (
        <form
            className='border p-4 shadow-lg rounded'
            onSubmit={onSubmitHandler}
        >
            <div className='mb-3'>
                <label htmlFor='name' className='form-label fs-4'>
                    Имя нового героя
                </label>
                <input
                    required
                    type='text'
                    name='name'
                    className='form-control'
                    id='name'
                    placeholder='Как меня зовут?'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor='text' className='form-label fs-4'>
                    Описание
                </label>
                <textarea
                    required
                    name='text'
                    className='form-control'
                    id='text'
                    placeholder='Что я умею?'
                    style={{ height: '130px' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor='element' className='form-label'>
                    Выбрать элемент героя
                </label>
                <select
                    required
                    className='form-select'
                    id='element'
                    name='element'
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                >
                    <option>Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type='submit' className='btn btn-primary'>
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
