const headersMap = {
    id: 'Ид',
    fname: 'Имя',
    lname: 'Фамилия',
    like: 'Лайки',
    comment: 'Комментарии',
}

export const saveToCSV = (props, filename = "Активность в ВК.csv",) => {
    const delimiter = ";"
    const headers = Object.values(headersMap)
    const keys = Object.keys(headersMap)
    const escapeValue = (value) => {
        if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`
        }
        return value ?? ""
    }
    const csvContent = [
        "\uFEFF" + headers.join(delimiter),
        ...props.data.map(row => keys.map(key => escapeValue(row[key])).join(delimiter))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }