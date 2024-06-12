import fs from 'fs-extra'

export const deleteTempFile = async (filePath: string) => {
  await fs.unlink(filePath)
}
