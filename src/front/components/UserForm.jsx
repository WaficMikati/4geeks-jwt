import { Form, Link } from "react-router-dom"

export const UserForm = () => {
    return (
        <Form method="POST" className="d-grid gap-2 justify-content-center">
            <div className="input-group">
                <label htmlFor="email" className="col-4 input-group-text">Email</label>
                <input type="email" id="email" name="email" className="form-control" required />

            </div>
            <div className="input-group">
                <label htmlFor="password" className="col-4 input-group-text">Password</label>
                <input type="password" id="password" name="password" className="form-control" required />
            </div>
            <div className="input-group">
                <div className="w-100 d-flex gap-3" >
                    <Link to="/" className="btn btn-danger w-100">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-success w-100">
                        Submit
                    </button>
                </div>
            </div>
        </Form>
    )
}