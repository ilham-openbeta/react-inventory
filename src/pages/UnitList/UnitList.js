import {useEffect, Fragment, useState} from 'react';
import {Table, Button, Container, Alert} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux'
import {findAll, removeById} from '../../actions/unitAction'
import {faTrash, faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {TrinityRingsSpinner} from "react-epic-spinners";
import swal from '@sweetalert/with-react'

function UnitRow({data, onDelete, onUpdate}) {
    return (
        <tr>
            <td>
                <Link to={`/units/${data.id}`}>{data.id}</Link>
            </td>
            <td>{data.code}</td>
            <td>{data.description}</td>
            <td>
                <Button onClick={onDelete} color="danger" size="sm" style={{margin: '5px'}}>
                    <FontAwesomeIcon icon={faTrash} style={{margin: "1px"}}/> Delete
                </Button>
                <Button onClick={onUpdate} color="success" size="sm">
                    <FontAwesomeIcon icon={faEdit} style={{margin: "1px"}}/> Edit
                </Button>
            </td>
        </tr>
    );
}


function UnitList({isLoading, units, findAll, removeById, isRemoved, error, deleteId, deleteLoading}) {

    const history = useHistory()

    const [errorState, setErrorState] = useState(null)

    useEffect(() => {
        if (error) {
            setErrorState(error)
        }
        if (isRemoved) {
            findAll();
        }
    }, [error,isRemoved, findAll])

    useEffect(() => {
        findAll();
    }, [findAll]);

    const deleteHandler = (id) => {
        swal({
            text: "Are you sure you want to delete this unit?",
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: false,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            }
        }).then(value => {
            if (value) {
                removeById(id);
            }
        })
    };

    const addHandler = () => {
        history.push("/units/add")
    }

    const editHandler = (id) => {
        history.push(`/units/${id}`)
    }

    const onErrorClick = () => {
        setErrorState(null)
    }

    return (
        <Fragment>
            {errorState && <Alert color="danger" onClick={onErrorClick}>{error.message}</Alert>}
            <Container>
                <div className="d-flex justify-content-center mb-3">
                    <h1> Unit Details </h1>
                </div>
                <Button onClick={addHandler} color="primary" className="mb-3">
                    <FontAwesomeIcon icon={faPlus} style={{margin: "1px"}}/> Add Unit
                </Button>
                <Table striped>
                    <thead>
                    <tr>
                        <th scope="row">ID</th>
                        <th scope="row">Code</th>
                        <th scope="row">Description</th>
                        <th scope="row">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        !isLoading ?
                            units.map(e =>
                                <UnitRow key={e.id.toString()} data={e} onDelete={() => deleteHandler(e.id)}
                                         onUpdate={() => editHandler(e.id)}/>
                            ) :
                            <tr>
                                <td colSpan="4"><TrinityRingsSpinner color="black" style={{margin: "auto"}}/></td>
                            </tr>
                    }
                    </tbody>
                </Table>
            </Container>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.findAllUnit.loading,
        deleteId: Number(state.removeUnitById.id),
        deleteLoading: state.removeUnitById.loading,
        isRemoved: state.removeUnitById.data,
        units: state.findAllUnit.data || [],
        error: state.findAllUnit.error || state.removeUnitById.error
    }
};

const mapDispatchToProps = {findAll, removeById}

export default connect(mapStateToProps, mapDispatchToProps)(UnitList);