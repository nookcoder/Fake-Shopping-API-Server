/**
 * Request Key 값과 Database Model 키값 비교
 * @param keyExpected
 * @param keyRequested
 */
export function checkKeyOfRequestBody(keyExpected: string[], keyRequested: string[]):boolean {
    return keyRequested.filter(key => {
        return !keyExpected.includes(key)
    }).length === 0;
}
