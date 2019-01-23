import {
    getUser,
    getAddressList
} from '../service/getData'
import {
    GET_USERINFO,
    SAVE_ADDRESS
} from './mutation-types'

export default {
    async getUserInfo({
        commit,
        state
    }) {
        let res = await getUSer();
        commit(GET_USERINFO,res)
    },
    async saveAddress({
        commit,
        state
    }) {
        if(state.removeAddress.length > 0) return;

        let addres = await getAddressList(state.getUserInfo.user_id);
        commit(SAVE_ADDRESS, addres);
    }
}