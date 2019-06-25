import BytomObj from '../utils/Bytom'
import {apis} from '../utils/BrowserApis';

export default class StorageService {

    constructor(){}

    /***
     * Saves an instance of Bytom in the extension's local storage
     * The keychain will always be encrypted when in storage
     * @param bytom
     * @returns {Promise}
     */
    static save(_bytom){
        return new Promise(resolve => {
            apis.storage.local.set({bytom:_bytom}, () => {
                resolve(_bytom);
            });
        })
    };

    /***
     * Gets an instance of Bytom from the extension's local storage
     * Will return a new Bytom instance if not found.
     * @returns {Promise}
     */
    static get() {
        return new Promise(resolve => {
            apis.storage.local.get('bytom', (possible) => {
                (possible && Object.keys(possible).length && possible.hasOwnProperty('bytom'))
                    ? resolve(BytomObj.fromJson(possible.bytom))
                    : resolve(BytomObj.placeholder());
            });
        })
    }

    /***
     * Removes the instance of Bytom.
     * This will delete all user data.
     * @returns {Promise}
     */
    static remove(){
        return new Promise(resolve => {
            apis.storage.local.remove('bytom', () => {
                resolve();
            });
        })
    }

    /***
     * Caches an ABI
     * @param contractName
     * @param chainId
     * @param abi
     * @returns {Promise}
     */
    static cacheABI(contractName, chainId, abi){
        return new Promise(resolve => {
            apis.storage.local.set({[`abi:${contractName}:${chainId}`]:abi}, () => {
                resolve(abi);
            });
        });
    }

    /***
     * Fetches an ABI from cache
     * @param contractName
     * @param chainId
     * @returns {Promise}
     */
    static getABI(contractName, chainId){
        return new Promise(resolve => {
            const prop = `abi:${contractName}:${chainId}`;
            apis.storage.local.get(prop, (possible) => {
                if(JSON.stringify(possible) !== '{}') resolve(possible[prop]);
                else resolve('no cache');
            });
        })
    }

    static getSalt(){
        return new Promise(resolve => {
            apis.storage.local.get('salt', (possible) => {
                if(JSON.stringify(possible) !== '{}') resolve(possible.salt);
                else resolve('SALT_ME');
            });
        })
    }

    static setSalt(salt){
        return new Promise(resolve => {
            apis.storage.local.set({salt}, () => {
                resolve(salt);
            });
        })
    }
}
