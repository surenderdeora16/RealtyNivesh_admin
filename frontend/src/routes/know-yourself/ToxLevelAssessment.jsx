import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/Website/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer } from '../../redux/quiz-two/quizTwoSlice'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const ToxLevelAssessment = () => {

    const { data } = useSelector(store => store.quiz_two);
    const dispatch = useDispatch();
    const [index, setIndex] = useState(1);
    const [total, setTotal] = useState(0)

    const current = data?.[index - 1];

    const changeOption = (queIndex, value) => {
        dispatch(setAnswer({ index: index - 1, queIndex, value: parseInt(value) }));
    }

    const updateAnswer = (type) => {
        if (type === '-' && index > 1) setIndex(index - 1);
        if (type === '+' && index < data.length) {

            if (!current.questions.find(r => r.selection === null)) {
                setIndex(index + 1);
                setTotal(total + current.selection)
            } else {
                toast.error("Please answer all questions first.");
            }
        }
    }

    const options = [
        'Never/rarely have the symptom',
        'Occasionally have it, effect not severe',
        'Occasionally have, effect severe',
        'Frequently have it, effect not severe',
        'Frequently have it, effect severe'
    ]

    useEffect(() => {
        if (index === data.length) {

            const toxLevel = data.reduce((acc, obj) => acc + obj.questions.reduce((inAcc, inObj) => inAcc + inObj.selection, 0), 0)
            let levelDescription = 'N/A';
            if (toxLevel < 10) {
                levelDescription = 'Optimal';
            } else if (toxLevel >= 10 && toxLevel <= 50) {
                levelDescription = 'Mild';
            } else if (toxLevel > 50 && toxLevel <= 100) {
                levelDescription = 'Moderate';
            } else {
                levelDescription = 'Severe';
            }

            MySwal.fire({
                html: `<h4 class="my-3 text-dark fw-normal">Your Tox Level  is <strong> ${levelDescription} </strong> </h4>`,
                // icon: 'success',
            })
        }
    }, [index, data])

    return (
        <section className="elementor-section elementor-top-section">
            <PageHeader title='TOX level Assessment Quiz' subTitle='Find out the TOXIN levels in your body with this simple quiz to know the status of your health.' />
            <div className='container py-5'>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="quiz-container">
                            <h3 className='text-dark text-center fs-3 border-bottom pb-3'>Which Highly apply to you.</h3>
                            <div className="question ml-sm-5 pl-sm-5 pt-2 mb-4">
                                <div className="py-2 h5"><b>{current.heading}</b></div>
                                <div className="d-flex gap-3 flex-column mb-3">
                                    {current.questions.map((row, i) => {
                                        return <div key={i}>
                                            <p className='mb-3'>Q {i + 1}. {row.que}</p>
                                            <div className="d-flex gap-3 flex-column mb-3">
                                                {options.map((inRow, j) => {
                                                    return <label key={j} className="options">{inRow}
                                                        <input type="radio" name={`answer[${i}]`} value={j} checked={row.selection === j} onChange={(e) => changeOption(i, j)} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                })}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="position- d-flex justify-content-between align-items-center mt-auto mb-0">
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

export default ToxLevelAssessment