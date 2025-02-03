const Alert = ReactBootstrap.Alert;
const Card = ReactBootstrap.Card;
const Button = ReactBootstrap.Button;
const Table = ReactBootstrap.Table;

const db = window.db;
const collection = window.collection;
const getDocs = window.getDocs;
const addDoc = window.addDoc;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            stdid: "",
            stdtitle: "",
            stdfname: "",
            stdlname: "",
            stdemail: "",
            stdphone: "",
            loading: false,
            message: "กดปุ่มเพื่อโหลดข้อมูล"
        };
    }

    TextInput({ label, value, style }) {
        return (
            <label className="form-label">
                {label}:
                <input
                    className="form-control"
                    style={style}
                    value={this.state[value]}
                    onChange={(ev) => {
                        var s = {};
                        s[value] = ev.target.value;
                        this.setState(s);
                    }}
                ></input>
            </label>
        );
    }

    async readData() {
        this.setState({ loading: true, message: "กำลังโหลดข้อมูล..." });
        try {
            const querySnapshot = await getDocs(collection(db, "students"));
            const stdlist = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            this.setState({ students: stdlist, loading: false, message: stdlist.length > 0 ? "" : "ไม่มีข้อมูล" });
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ loading: false, message: "เกิดข้อผิดพลาดในการโหลดข้อมูล" });
        }
    }

    async autoRead() {
        this.setState({ loading: true, message: "กำลังโหลดข้อมูลอัตโนมัติ..." });
        try {
            const querySnapshot = await getDocs(collection(db, "students"));
            const stdlist = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            this.setState({ students: stdlist, loading: false, message: stdlist.length > 0 ? "" : "ไม่มีข้อมูล" });
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ loading: false, message: "เกิดข้อผิดพลาดในการโหลดข้อมูล" });
        }
    }

    async insertData() {
        try {
            const docRef = await addDoc(collection(db, "students"), {
                id: this.state.stdid,
                title: this.state.stdtitle,
                fname: this.state.stdfname,
                lname: this.state.stdlname,
                email: this.state.stdemail,
                phone: this.state.stdphone
            });
            console.log("Document written with ID: ", docRef.id);
            this.autoRead(); // โหลดข้อมูลใหม่
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    async deleteStudent(studentId) {
        if (!window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) return;
        
        try {
            await window.deleteDoc(window.doc(db, "students", studentId));
            console.log("Deleted Student ID:", studentId);
            this.autoRead();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    editStudent(student) {
        this.setState({
            stdid: student.id,
            stdtitle: student.title,
            stdfname: student.fname,
            stdlname: student.lname,
            stdemail: student.email,
            stdphone: student.phone
        });
    }

    renderTable() {
        if (this.state.loading) {
            return <div className="alert alert-info">🔄 {this.state.message}</div>;
        }
    
        if (this.state.students.length === 0) {
            return <div className="alert alert-warning">⚠️ {this.state.message}</div>;
        }
    
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>คำนำหน้า</th>
                        <th>ชื่อ</th>
                        <th>สกุล</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.title}</td>
                            <td>{student.fname}</td>
                            <td>{student.lname}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => this.editStudent(student)}>📝 แก้ไข</Button>
                                <Button variant="danger" size="sm" onClick={() => this.deleteStudent(student.id)} style={{ marginLeft: "10px" }}>❌ ลบ</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    componentDidMount() {
        this.autoRead();
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <Alert variant="info">
                        <b>Work6 :</b> Firebase
                    </Alert>
                </Card.Header>
                <Card.Body>
                    <Button onClick={() => this.readData()}>Read Data</Button>
                    <Button onClick={() => this.autoRead()} style={{ marginLeft: "10px" }}>Auto Read</Button>

                    <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</h3>
                    {this.TextInput({ label: "ID", value: "stdid", style: { width: 120, marginRight: "10px" } })}
                    {this.TextInput({ label: "คำนำหน้า", value: "stdtitle", style: { width: 100, marginRight: "10px" } })}
                    {this.TextInput({ label: "ชื่อ", value: "stdfname", style: { width: 120, marginRight: "10px" } })}
                    {this.TextInput({ label: "สกุล", value: "stdlname", style: { width: 120, marginRight: "10px" } })}
                    {this.TextInput({ label: "Email", value: "stdemail", style: { width: 150, marginRight: "10px" } })}
                    {this.TextInput({ label: "Phone", value: "stdphone", style: { width: 120, marginRight: "10px" } })}
                    <Button onClick={() => this.insertData()} variant="success" style={{ marginLeft: "10px" }}>Save</Button>

                    <div style={{ marginTop: "20px" }}>
                        <h5>📌 รายชื่อนักศึกษา</h5>
                        {this.renderTable()}
                    </div>
                </Card.Body>
                <Card.Footer>
                    By 653380139-1 Panatakorn Supak <br />
                    College of Computing, Khon Kaen University
                </Card.Footer>
            </Card>
        );
    }
}

const container = document.getElementById("myapp");
ReactDOM.render(<App />, container);
