import {watchFindAllUnit, watchRemoveUnitById, watchFindUnitById, watchSaveUnit} from "./unitSagas";
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        watchFindAllUnit(), watchFindUnitById(),watchRemoveUnitById(), watchSaveUnit()
        ]
    )
}