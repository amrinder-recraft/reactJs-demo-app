export const onTextChange = func => e => func(e.target.value)

export const toOptions = (data, options) => {
    return data.map(
        item => {
            return {
                ...item,
                value: item[options.value],
                label: item[options.label]
            }
        }
    )
}