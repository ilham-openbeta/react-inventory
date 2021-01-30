import {
    FIND_ALL_UNIT,
    FIND_UNIT_BY_ID,
    REMOVE_UNIT_BY_ID,
    SAVE_UNIT, TEST_ACTION
} from "../constants/actions"

// Actions must have a type field that indicates the type of action being performed. Types can be defined as constants
// and imported from another module. It's better to use strings for type than Symbols because strings are serializable.
export function save(model) {
    return {
        type: SAVE_UNIT,
        model: model
    }
}

export function findById(id) {
    return {
        type: FIND_UNIT_BY_ID,
        id: id
    }
}

export function findAll() {
    return {
        type: FIND_ALL_UNIT,
    }
}

export function removeById(id) {
    return {
        type: REMOVE_UNIT_BY_ID,
        id: id
    }
}