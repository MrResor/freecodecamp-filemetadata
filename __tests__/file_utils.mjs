import fs from 'fs'

function filePrep (fileName, size) {
  fs.writeFileSync(fileName, Buffer.alloc(size)) // Create an empty file for testing
}

function fileCleanup (fileName) {
  try {
    fs.unlinkSync(fileName) // Delete the file after testing
  } catch (err) {
    console.error(`Error deleting file ${fileName}:`, err)
  }
}

export { filePrep, fileCleanup }
