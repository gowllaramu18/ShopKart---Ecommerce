import { Link } from "react-router-dom";

function Home() {
    return (
        <div>

            {/* HERO SECTION */}
            <section
                style={{
                    minHeight: "660px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "70px 8%",
                    background:
                        "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
                    color: "white"
                }}
            >

                {/* LEFT CONTENT */}
                <div style={{ maxWidth: "600px" }}>

                    <p
                        style={{
                            color: "#93c5fd",
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "18px",
                            letterSpacing: "1px"
                        }}
                    >
                        WELCOME TO SHOPKART
                    </p>

                    <h1
                        style={{
                            fontSize: "58px",
                            lineHeight: "1.1",
                            marginBottom: "25px",
                            color: "white"
                        }}
                    >
                        Shop Smart.
                        <br />
                        Shop{" "}
                        <span style={{ color: "#60a5fa" }}>
                            Better.
                        </span>
                    </h1>

                    <p
                        style={{
                            fontSize: "19px",
                            lineHeight: "1.7",
                            color: "#dbeafe",
                            marginBottom: "35px"
                        }}
                    >
                        Discover quality products at great prices.
                        Explore electronics, fashion and more —
                        all in one place.
                    </p>

                    <Link
                        to="/products"
                        style={{
                            display: "inline-block",
                            backgroundColor: "#60a5fa",
                            color: "#0f172a",
                            padding: "15px 30px",
                            borderRadius: "10px",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "17px",
                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.2)"
                        }}
                    >
                        Shop Now →
                    </Link>

                </div>


                {/* SHOPPING ICON */}
                <div
                    style={{
                        fontSize: "150px",
                        marginRight: "5%",
                        filter:
                            "drop-shadow(0 15px 25px rgba(0,0,0,0.3))"
                    }}
                >
                    🛍️
                </div>

            </section>


            {/* FEATURES SECTION */}
            <section
                style={{
                    padding: "65px 8%",
                    backgroundColor: "white"
                }}
            >

                <h2
                    style={{
                        textAlign: "center",
                        fontSize: "34px",
                        marginBottom: "45px",
                        color: "#0f172a"
                    }}
                >
                    Why ShopKart?
                </h2>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(3, 1fr)",
                        gap: "30px"
                    }}
                >

                    <Feature
                        icon="🚚"
                        title="Fast Delivery"
                        text="Get your products delivered quickly and safely."
                    />

                    <Feature
                        icon="🔒"
                        title="Secure Shopping"
                        text="Your shopping experience is safe and secure."
                    />

                    <Feature
                        icon="💰"
                        title="Best Prices"
                        text="Find quality products at affordable prices."
                    />

                </div>

            </section>


            {/* BOTTOM CTA */}
            <section
                style={{
                    margin: "60px 8%",
                    padding: "50px",
                    borderRadius: "20px",
                    textAlign: "center",
                    background:
                        "linear-gradient(135deg, #1e3a8a, #2563eb)",
                    color: "white",
                    boxShadow:
                        "0 10px 30px rgba(37,99,235,0.25)"
                }}
            >

                <h2
                    style={{
                        fontSize: "34px",
                        marginBottom: "15px"
                    }}
                >
                    Ready to start shopping?
                </h2>

                <p
                    style={{
                        color: "#dbeafe",
                        fontSize: "17px",
                        marginBottom: "28px"
                    }}
                >
                    Explore our products and find something
                    you love.
                </p>

                <Link
                    to="/products"
                    style={{
                        display: "inline-block",
                        backgroundColor: "white",
                        color: "#1e3a8a",
                        padding: "13px 28px",
                        borderRadius: "9px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "16px"
                    }}
                >
                    Explore Products
                </Link>

            </section>

        </div>
    );
}


function Feature({ icon, title, text }) {
    return (
        <div
            style={{
                padding: "32px",
                textAlign: "center",
                borderRadius: "15px",
                backgroundColor: "#f8fafc",
                boxShadow:
                    "0 5px 18px rgba(0,0,0,0.08)"
            }}
        >

            <div
                style={{
                    fontSize: "45px",
                    marginBottom: "18px"
                }}
            >
                {icon}
            </div>

            <h3
                style={{
                    fontSize: "21px",
                    marginBottom: "12px"
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    color: "#64748b",
                    lineHeight: "1.6"
                }}
            >
                {text}
            </p>

        </div>
    );
}

export default Home;