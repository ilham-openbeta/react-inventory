import {Form, FormGroup, Label, Col, Input, Button, Container} from "reactstrap";
import {Link, useHistory, useParams} from "react-router-dom";
import {useEffect} from 'react'
import {findById, save} from "../../actions/unitAction";
import {connect} from "react-redux";
import {useState} from 'react'
import {AtomSpinner} from "react-epic-spinners";

function UnitForm({unit, findById, isLoading, save, savedUnit}) {

    const [model, setModel] = useState({code: '', description: ''});
    const {id} = useParams();

    const history = useHistory()

    useEffect(() => {
        if (id) {
            findById(id)
        }
    }, [id, findById]);

    useEffect(() => {
        if (unit) {
            setModel({
                ...unit
            })
        }
    }, [unit]);

    // nunggu state save berubah baru pindah halaman
    useEffect(() => {
        if (savedUnit) {
            history.push('/units')
        }
    }, [savedUnit, history])

    const onSubmit = () => {
        save(model)
    }

    return (
        <Container>
            <h1 style={{textAlign: "center"}}>{id === undefined ? "Add Unit" : "Edit Unit"}</h1>
            {
                !isLoading ?
                    <Form>
                        <FormGroup row>
                            <Label htmlFor="code" sm={{size: 2, offset: 2}} size="lg">Code</Label>
                            <Col sm={{size: 6, offset: 2}}>
                                <Input placeholder="e.g. kg" id="code" name="code" value={model.code || ''} bsSize="lg"
                                       onChange={e => setModel({...model, [e.target.name]: e.target.value})}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="description" sm={{size: 2, offset: 2}} size="lg">Description</Label>
                            <Col sm={{size: 6, offset: 2}}>
                                <Input placeholder="e.g. kilograms" name="description" id="description"
                                       value={model.description || ''} bsSize="lg"
                                       onChange={e => setModel({...model, [e.target.name]: e.target.value})}/>
                            </Col>
                        </FormGroup>
                        <Col sm={{size: 6, offset: 6}}>
                            <Link to="/units" className="mr-2">
                                <Button color="secondary">
                                    Cancel
                                </Button>
                            </Link>
                            <Button color="success"
                                    onClick={onSubmit}>{id === undefined ? "Add Unit" : "Update Unit"}</Button>
                        </Col>
                    </Form>
                    :
                    <AtomSpinner color="black" style={{margin: "auto"}}/>
            }
        </Container>
    );
}

const mapStateToProps = (state) => {
        return {
            unit: state.findUnitById.data,
            isLoading: state.findUnitById.loading || state.saveUnit.loading,
            savedUnit: state.saveUnit.data
        }
    }
;

const mapDispatchToProps =
    {
        findById, save
    }

export default connect(mapStateToProps, mapDispatchToProps)(UnitForm);