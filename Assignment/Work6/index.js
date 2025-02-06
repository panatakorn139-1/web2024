const Alert = ReactBootstrap.Alert;
const Card = ReactBootstrap.Card;
const Button = ReactBootstrap.Button;
const Table = ReactBootstrap.Table;

const db = window.db;
const collection = window.collection;
const getDocs = window.getDocs;
const addDoc = window.addDoc;
const deleteDoc = window.deleteDoc;
const doc = window.doc;
const auth = window.auth;
const provider = window.provider;
const signInWithPopup = window.signInWithPopup;
const signOut = window.signOut;
const onAuthStateChanged = window.onAuthStateChanged;

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
            message: "กดปุ่มเพื่อโหลดข้อมูล",
            editingDocId: null,
            user: null
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
            const stdlist = querySnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
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
            const stdlist = querySnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
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
            this.autoRead();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    async deleteStudent(docId) {
        if (!window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) return;
        try {
            await deleteDoc(doc(db, "students", docId));
            this.autoRead();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    editStudent(student, docId) {
        this.setState({
            stdid: student.id,
            stdtitle: student.title,
            stdfname: student.fname,
            stdlname: student.lname,
            stdemail: student.email,
            stdphone: student.phone,
            editingDocId: docId
        });
    }


    async updateStudent() {
        if (!this.state.editingDocId) {
            alert("กรุณาเลือกข้อมูลที่ต้องการแก้ไข");
            return;
        }

        try {
            await setDoc(doc(db, "students", this.state.editingDocId), {
                id: this.state.stdid,
                title: this.state.stdtitle,
                fname: this.state.stdfname,
                lname: this.state.stdlname,
                email: this.state.stdemail,
                phone: this.state.stdphone
            });
            console.log("Updated Student ID:", this.state.editingDocId);
            this.setState({ editingDocId: null });
            this.autoRead();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    cancelEdit() {
        this.setState({
            stdid: "",
            stdtitle: "",
            stdfname: "",
            stdlname: "",
            stdemail: "",
            stdphone: "",
            editingDocId: null
        });
    }


    renderTable() {
        if (this.state.loading) {
            return <div className="alert alert-info">🔄 {this.state.message}</div>;
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
                                <Button variant="warning" size="sm" onClick={() => this.editStudent(student, student.docId)}>📝 แก้ไข</Button>
                                <Button variant="danger" size="sm" onClick={() => this.deleteStudent(student.docId)} style={{ marginLeft: "10px" }}>❌ ลบ</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
    

    componentDidMount() {
        this.readData();
        onAuthStateChanged(auth, (user) => {
            this.setState({ user });
        });
    }

    signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            this.setState({ user: result.user });
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    signOut = async () => {
        try {
            if (!window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) return;
            await signOut(auth);
            this.setState({ user: null });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    render() {
        return (
            <Card>
                <Card.Header>
                    <Alert variant="info">
                        <b>Work6 :</b> Firebase
                    </Alert>
                    {this.state.user ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <img src={this.state.user.photoURL} alt="User" width="40" height="40" style={{ borderRadius: "50%" }} />
                            <span>{this.state.user.email}</span>
                            <Button variant="danger" onClick={this.signOut}>Logout</Button>
                        </div>
                    ) : (
                        <Button onClick={this.signInWithGoogle} variant="primary">Login with Google</Button>
                    )}
                </Card.Header>
                <Card.Body>
                    <Button onClick={() => this.readData()}>Read Data</Button>

                    <h3 style={{ marginTop: "20px" }}>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {this.TextInput({ label: "ID", value: "stdid" })}
                        {this.TextInput({ label: "คำนำหน้า", value: "stdtitle" })}
                        {this.TextInput({ label: "ชื่อ", value: "stdfname" })}
                        {this.TextInput({ label: "สกุล", value: "stdlname" })}
                        {this.TextInput({ label: "Email", value: "stdemail" })}
                        {this.TextInput({ label: "Phone", value: "stdphone" })}
                    </div>

                    <Button
                        onClick={() => this.state.editingDocId ? this.updateStudent() : this.insertData()}
                        variant="success"
                        style={{marginRight: "10px" }}
                    >
                        {this.state.editingDocId ? "อัปเดต" : "บันทึก"}
                    </Button>

                    {this.state.editingDocId && (
                        <Button
                            onClick={() => this.cancelEdit()}
                            variant="secondary"
                            style={{ marginLeft: "10px" }}
                        >
                            ❌ ยกเลิก
                        </Button>
                    )}


                    <div style={{ marginTop: "20px" }}>
                        <h5>📌 รายชื่อนักศึกษา</h5>
                        {this.renderTable()}
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

const container = document.getElementById("myapp");
ReactDOM.render(<App />, container);
