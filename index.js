// -> Core
import { OstonAuth } from "./src/core/auth";
import Ostorage from "./src/core/ostorage"

// -> CSS
import "./app.scss";

//-> SETUP
document.addEventListener("readystatechange", () => {
	if (document.readyState === "complete") {
		const store = new Ostorage()
		const oston = new OstonAuth();

		// oston.generateAnonymous();

		store.config.name = 'ostorage'

		store.dispatch("user.creditCards", [{"card":"one"},{"card":"two"}])
		store.dispatch("user.msisdn", "5551999999999")
		store.dispatch("iamoston", oston.generateAnonymous())
	}
});
