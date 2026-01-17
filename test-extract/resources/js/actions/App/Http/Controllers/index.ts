import UtenteController from './UtenteController'
import TipoDeCirurgiaController from './TipoDeCirurgiaController'
import TipoDeOrigemController from './TipoDeOrigemController'
import EspecialidadeController from './EspecialidadeController'
import ZonaAnatomicaController from './ZonaAnatomicaController'
import HospitalController from './HospitalController'
import DiagnosticoController from './DiagnosticoController'
import ProcedimentoController from './ProcedimentoController'
import RegistoCirurgicoController from './RegistoCirurgicoController'
import AtividadeCientificaController from './AtividadeCientificaController'
import FormacaoController from './FormacaoController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    UtenteController: Object.assign(UtenteController, UtenteController),
TipoDeCirurgiaController: Object.assign(TipoDeCirurgiaController, TipoDeCirurgiaController),
TipoDeOrigemController: Object.assign(TipoDeOrigemController, TipoDeOrigemController),
EspecialidadeController: Object.assign(EspecialidadeController, EspecialidadeController),
ZonaAnatomicaController: Object.assign(ZonaAnatomicaController, ZonaAnatomicaController),
HospitalController: Object.assign(HospitalController, HospitalController),
DiagnosticoController: Object.assign(DiagnosticoController, DiagnosticoController),
ProcedimentoController: Object.assign(ProcedimentoController, ProcedimentoController),
RegistoCirurgicoController: Object.assign(RegistoCirurgicoController, RegistoCirurgicoController),
AtividadeCientificaController: Object.assign(AtividadeCientificaController, AtividadeCientificaController),
FormacaoController: Object.assign(FormacaoController, FormacaoController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers