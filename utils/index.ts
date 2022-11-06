import { IProduct } from "~/models";

export function filterByWord(arrayItem: IProduct, searchWord: string) {
  let result = false
  for (const key in arrayItem) {
    if(String(arrayItem[key as keyof typeof arrayItem]).toLowerCase().includes(searchWord.toLowerCase())) {
     result = true
    }
  }
  return result
}
