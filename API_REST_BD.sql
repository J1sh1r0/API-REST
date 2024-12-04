CREATE DATABASE ArmasDB;
GO

USE ArmasDB;
GO

CREATE TABLE Armas (
    id INT PRIMARY KEY IDENTITY(1,1),   -- ID autoincremental
    nombre VARCHAR(100) NOT NULL,        -- Nombre del arma
    calibre VARCHAR(50) NOT NULL,        -- Calibre del arma
    tipo VARCHAR(100) NOT NULL,          -- Tipo de arma (semiautom�tica, rev�lver, etc.)
    pais_origen VARCHAR(100) NOT NULL    -- Pa�s de origen del arma
);
GO

SELECT * FROM Armas;
SELECT * FROM Armas WHERE calibre = '5.56x45mm';

INSERT INTO Armas (nombre, calibre, tipo, pais_origen) 
VALUES 
    ('AK-47', '7.62x39mm', 'Fusil de asalto', 'Rusia'),
    ('M16', '5.56x45mm', 'Fusil de asalto', 'EE.UU.'),
    ('Desert Eagle', '0.50 AE', 'Pistola', 'Israel'),
    ('Glock 17', '9mm', 'Pistola', 'Austria'),
    ('Beretta 92', '9mm', 'Pistola', 'Italia'),
    ('Remington 870', '12 Gauge', 'Escopeta', 'EE.UU.'),
    ('Mossberg 500', '12 Gauge', 'Escopeta', 'EE.UU.'),
    ('Uzi', '9mm', 'Subfusil', 'Israel'),
    ('MP5', '9mm', 'Subfusil', 'Alemania'),
    ('FN SCAR', '5.56x45mm', 'Fusil de asalto', 'B�lgica'),
    ('Steyr AUG', '5.56x45mm', 'Fusil de asalto', 'Austria'),
    ('Colt Python', '.357 Magnum', 'Rev�lver', 'EE.UU.'),
    ('Smith & Wesson Model 29', '.44 Magnum', 'Rev�lver', 'EE.UU.'),
    ('Walther P99', '9mm', 'Pistola', 'Alemania'),
    ('Sig Sauer P226', '9mm', 'Pistola', 'Suiza'),
    ('Heckler & Koch USP', '9mm', 'Pistola', 'Alemania'),
    ('Barrett M82', '.50 BMG', 'Fusil de francotirador', 'EE.UU.'),
    ('CheyTac M200', '.408 CheyTac', 'Fusil de francotirador', 'EE.UU.'),
    ('Springfield M1A', '7.62x51mm', 'Rifle de precisi�n', 'EE.UU.'),
    ('M1 Garand', '30-06 Springfield', 'Rifle de cerrojo', 'EE.UU.'),
    ('Winchester Model 70', '30-06 Springfield', 'Rifle de cerrojo', 'EE.UU.'),
    ('Ruger 10/22', '.22 LR', 'Rifle semiautom�tico', 'EE.UU.'),
    ('Savage Model 110', '6.5mm Creedmoor', 'Rifle de cerrojo', 'EE.UU.'),
    ('Browning BAR', '7mm Remington Magnum', 'Rifle semiautom�tico', 'B�lgica'),
    ('FN FAL', '7.62x51mm', 'Fusil de asalto', 'B�lgica'),
    ('Tavor X95', '5.56x45mm', 'Fusil de asalto', 'Israel'),
    ('Kris Vector', '9mm', 'Subfusil', 'EE.UU.'),
    ('F2000', '5.56x45mm', 'Fusil de asalto', 'B�lgica'),
    ('CZ-75', '9mm', 'Pistola', 'Rep�blica Checa'),
    ('AK-74', '5.45x39mm', 'Fusil de asalto', 'Rusia'),
    ('CZ Scorpion Evo 3', '9mm', 'Subfusil', 'Rep�blica Checa');
GO

INSERT INTO Armas (nombre, calibre, tipo, pais_origen) 
VALUES 
    ('AK-103', '7.62x39mm', 'Fusil de asalto', 'Rusia'),
    ('G36', '5.56x45mm', 'Fusil de asalto', 'Alemania'),
    ('FN Herstal P90', '5.7x28mm', 'Subfusil', 'B�lgica'),
    ('M4A1', '5.56x45mm', 'Fusil de asalto', 'EE.UU.'),
    ('M1911', '.45 ACP', 'Pistola', 'EE.UU.'),
    ('Luger P08', '9mm', 'Pistola', 'Alemania'),
    ('Ruger SR1911', '.45 ACP', 'Pistola', 'EE.UU.'),
    ('Taurus Judge', '.410 Bore/.45 Colt', 'Rev�lver', 'Brasil'),
    ('F2000', '5.56x45mm', 'Fusil de asalto', 'B�lgica'),
    ('M240', '7.62x51mm', 'Ametralladora', 'EE.UU.'),
    ('PKM', '7.62x54mmR', 'Ametralladora', 'Rusia'),
    ('FN MAG', '7.62x51mm', 'Ametralladora', 'B�lgica'),
    ('MG3', '7.62x51mm', 'Ametralladora', 'Alemania'),
    ('SPAS-12', '12 Gauge', 'Escopeta', 'Italia'),
    ('Benelli M4', '12 Gauge', 'Escopeta', 'Italia'),
    ('Saiga-12', '12 Gauge', 'Escopeta', 'Rusia'),
    ('IWI Negev', '5.56x45mm', 'Ametralladora', 'Israel'),
    ('Springfield XD-S', '9mm', 'Pistola', 'EE.UU.'),
    ('FN F2000', '5.56x45mm', 'Fusil de asalto', 'B�lgica'),
    ('Heckler & Koch G3', '7.62x51mm', 'Fusil de asalto', 'Alemania'),
    ('FAMAS', '5.56x45mm', 'Fusil de asalto', 'Francia'),
    ('Steyr Scout', '5.56x45mm', 'Rifle de francotirador', 'Austria'),
    ('Armalite AR-10', '7.62x51mm', 'Fusil de asalto', 'EE.UU.'),
    ('KSG', '12 Gauge', 'Escopeta', 'EE.UU.'),
    ('Mauser C96', '7.63x25mm', 'Pistola', 'Alemania'),
    ('CZ-75 SP-01', '9mm', 'Pistola', 'Rep�blica Checa'),
    ('M60', '7.62x51mm', 'Ametralladora', 'EE.UU.'),
    ('Browning M1917', '0.30-06 Springfield', 'Ametralladora', 'EE.UU.'),
    ('Mosin-Nagant', '7.62x54mmR', 'Rifle de cerrojo', 'Rusia'),
    ('SKS', '7.62x39mm', 'Rifle semiautom�tico', 'Rusia'),
    ('Springfield Armory M1A', '7.62x51mm', 'Fusil de asalto', 'EE.UU.'),
    ('Barrett M82A1', '.50 BMG', 'Fusil de francotirador', 'EE.UU.'),
    ('Uzi Pro', '9mm', 'Subfusil', 'Israel'),
    ('FN L1A1', '7.62x51mm', 'Fusil de asalto', 'B�lgica'),
    ('Makarov PM', '9mm Makarov', 'Pistola', 'Rusia'),
    ('Luger P08', '9mm', 'Pistola', 'Alemania'),
    ('M3 Grease Gun', '0.45 ACP', 'Subfusil', 'EE.UU.'),
    ('Beretta 1915', '.32 ACP', 'Pistola', 'Italia'),
    ('Winchester 1897', '12 Gauge', 'Escopeta', 'EE.UU.'),
    ('M1 Thompson', '0.45 ACP', 'Subfusil', 'EE.UU.'),
    ('HK416', '5.56x45mm', 'Fusil de asalto', 'Alemania'),
    ('M1 Carbine', '30 Carbine', 'Carabina', 'EE.UU.'),
    ('L85A2', '5.56x45mm', 'Fusil de asalto', 'Reino Unido'),
    ('Steyr AUG A3', '5.56x45mm', 'Fusil de asalto', 'Austria');
GO
