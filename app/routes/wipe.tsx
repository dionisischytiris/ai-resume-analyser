import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {usePuterStore} from "~/lib/puter";
import Navbar from "~/components/Navbar";

const WipeApp = () => {
    const {auth, isLoading, error, clearError, fs, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <main>
            <Navbar/>

            <section className="main-section">
                <div className="page-heading">
                    <h2> Authenticated as: {auth.user?.username}</h2>
                    <div>Existing files:</div>
                    <div className="flex flex-col gap-4">
                        {files.map((file) => (
                            <div key={file.id} className="flex flex-row gap-4">
                                <p>{file.name}</p>
                                {/*<p>{file.id}</p>*/}

                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-10 mb-10 gap-4">
                    <button
                        className="primary-button"
                        onClick={() => handleDelete()}
                    >
                        Wipe All
                    </button>
                </div>
            </section>
        </main>
    );
};

export default WipeApp;