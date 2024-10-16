import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/Website/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { resetData, setAnswer } from '../../redux/quiz-one/quizOneSlice'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const PrakrutiAssessment = () => {

    const dispatch = useDispatch();
    const { data } = useSelector(store => store.quiz_one);
    const [index, setIndex] = useState(1);

    const current = data?.[index - 1];
    const onOptionChange = e => {
        dispatch(setAnswer({ index: index - 1, value: parseInt(e.target.value) }));
    }

    const updateAnswer = (type) => {
        if (type === '-' && index > 1) setIndex(index - 1);
        if (type === '+' && index < data.length) {
            if (current.selection) {
                setIndex(index + 1);
            } else {
                toast.error("Please select an option first.");
            }
        }
    }

    useEffect(() => {
        if (index === data.length && current.selection) {

            // Dosha mapping
            const doshaMapping = {
                "a": "Vata",
                "b": "Pitta",
                "c": "Kapha"
            };

            let result = {
                a: (data.filter(row => row.selection === 1).length * 100 / data.length).toFixed(2),
                b: (data.filter(row => row.selection === 2).length * 100 / data.length).toFixed(2),
                c: (data.filter(row => row.selection === 3).length * 100 / data.length).toFixed(2),
            }

            let sortable = Object.keys(result).map(row => [row, result[row]]).sort((a, b) => b[1] - a[1]).map(row => row[0]);
            let html = `<div><p>Vata Score is <b>${result.a}%</b></p><p>Pitta Score is <b>${result.b}%</b></p><p>Kapha Score is <b>${result.c}%</b></p><p>Your primary dosha is <b>${doshaMapping[sortable[0]]}</b></p><p>Your secondary dosha is <b>${doshaMapping[sortable[1]]}</b></p></div>`;
            MySwal.fire({ html }).then(function () { dispatch(resetData()); setIndex(1) });
        }
    }, [index, data, current.selection]);


    return (
        <section className="elementor-section elementor-top-section">
            <PageHeader title='Prakruti Assessment Quiz' subTitle='Discover your mind and body personality with this simple quiz to make smarter choices for a happier and healthier life.' />
            <div className='container py-5'>
                <div className="row mb-2">
                    <div className="col-12">
                        <div className="quiz-container">
                            <h3 className='text-center fs-3 border-bottom pb-3'>Which Highly apply to you.</h3>
                            <div className="question ml-sm-5 pl-sm-5 pt-2 mb-4">
                                <div className="py-2 h5"><b>Q {index}. {current.questions}</b></div>
                                <div className="d-flex gap-3 flex-column mb-3">
                                    {current.options.map((row, i) => {
                                        return <label key={i} className="options">{row}
                                            <input type="radio" name="answer" value={i + 1} checked={current.selection === i + 1} onChange={onOptionChange} />
                                            <span className="checkmark"></span>
                                        </label>
                                    })}
                                </div>
                            </div>
                            <div className=" d-flex justify-content-between align-items-center mt-auto mb-0">
                                <div className='d-flex gap-3'>
                                    <button disabled={index <= 1} className="btn-quiz" onClick={() => updateAnswer('-')}> <i className="fa fa-arrow-left"></i> <span className='d-lg-block d-none'>Previous</span></button>
                                    <button disabled={index >= data.length} className={`btn-quiz ${index >= data.length ? 'd-none' : ''}`} onClick={() => updateAnswer('+')}> <span className='d-lg-block d-none'>Next</span> <i className="fa fa-arrow-right"></i></button>
                                </div>
                                <p className='mb-0 text-white'>{index}/{data.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PrakrutiAssessment