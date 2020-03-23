// /* eslint no-use-before-define: 0 */  // --> OFF
// from google.cloud import firestore
// client = firestore.Client()

// # Converts strings added to / messages / { pushId } / original to uppercase
// def grade_code(data, context):
// """Triggered by a change to a Firestore document.
// Args:
// event(dict): Event payload.
//     context(google.cloud.functions.Context): Metadata for the event.
//     """
// resource_string = context.resource
// print(f"Function triggered by change to: {resource_string}.")
// """
// context.resource =
//     "projects/nr-programming-challenge-460b8/databases/(default)/documents/Submissions/KK0EwzCOc2BjaQY9pCR4"
// for example. 

//     """
//     # PARSE THE INCOMING METADATA AND CREATE POINTER TO NEW DOCUMENT
// path_parts = context.resource.split('/documents/')[1].split('/')
//     # path_parts = ['Submissions', 'KK0EwzCOc2BjaQY9pCR4'], for example.second object is new document.
//     collection_path = path_parts[0]
//     # collection_path = 'Submissions', for example
//     document_path = '/'.join(path_parts[1:])
//     # document_path = 'KK0EwzCOc2BjaQY9pCR4', for example
//     affected_doc = client.collection(collection_path).document(document_path)

//     # NOW GRAB NEW DATA FROM SUBMISSION
//     # "original" is the field name in the document
//     # probably change it to "code" or something
// #     cur_value = data["value"]["fields"]["original"]["stringValue"]
// cur_value = data["value"]["fields"]["code"]["stringValue"]
//     # cur_value should now contain text from field "code"
// new_value = cur_value.upper()

// print(f'Replacing value: {cur_value} --> {new_value}')

// affected_doc.set({
//     u'code': new_value
// })
