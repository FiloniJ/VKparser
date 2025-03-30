import { dataType } from "../App"

const headersMap = {
    id: 'Ид',
    fname: 'Имя',
    lname: 'Фамилия',
    like: 'Лайки',
    comment: 'Комментарии',
}

export const saveToCSV = (data: dataType[], filename = "Активность в ВК.csv",) => {
    const delimiter: string = ";"
    const headers: string[] = Object.values(headersMap)
    const keys: (keyof dataType)[] = Object.keys(headersMap) as (keyof dataType)[]
    const escapeValue = (value: string | number | undefined): string => {
        if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`
        } else if (typeof value == 'undefined') {
            return '0'
        }
        return `"${value}"`
    }
    const csvContent: string = [
        "\uFEFF" + headers.join(delimiter),
        ...data.map(row => keys.map(key => escapeValue(row[key])).join(delimiter))
    ].join("\n")

    const blob: Blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link: HTMLAnchorElement = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }