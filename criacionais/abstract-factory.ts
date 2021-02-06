// Cada produto distinto de uma família de produtos deve ter uma interface base.
interface Button {}
interface CheckBox {}

// Produtos concretos são criados por fábricas concretas correspondentes.
class WinButton implements Button {}
class WinCheckBox implements CheckBox {}
class MacButton implements Button {}
class MacChecBox implements CheckBox {}

// A interface fábrica abstrata declara um conjunto de métodos que retorna diferentes produtos abstratos.
interface IGUIFactory {
	createButton(): Button
	createCheckBox(): CheckBox
}

// Cada fábrica concreta tem uma variante de produto correspondente.
class WinFactory implements IGUIFactory {
	createButton = (): Button => new WinButton();
	createCheckBox = (): CheckBox => new WinCheckBox();
}
class MacFactory implements IGUIFactory {
	createButton = (): Button => new MacButton();
	createCheckBox = (): CheckBox => new MacChecBox();
}

// O código cliente trabalha com fábricas e produtos apenas através de tipos abstratos
class GUIFactory {
	private _button: Button;
	private _checkBox: CheckBox;

	constructor(private _factory: IGUIFactory) {}

	createButton = () => this._button = this._factory.createButton();
	createCheckBox = () => this._checkBox = this._factory.createCheckBox();
}

// Aplicação seleciona o tipo de fábrica dependendo da atual configuração do ambiente no estágio de inicialização
class App {

	private _guiFactory: IGUIFactory;
	private _gui: GUIFactory;

	main() {
		const os = "MacOS".substring(3);

		if (os === "Windows") this._guiFactory = new WinFactory();
		if (os === "Mac") this._guiFactory = new MacFactory();

		this._gui = new GUIFactory(this._guiFactory);
	}
}


